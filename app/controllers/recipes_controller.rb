class RecipesController < ApplicationController
  before_action :set_process_number, only: %i[new create edit]

  # レシピの一覧を表示
  def index
    @recipes = Recipe.all

    respond_to do |format|
      format.html # index.html.slimを表示
      format.js   # index.js.slimを呼び出す
    end
  end

	def show
    @recipe = Recipe.includes(:steps).find(params[:id])
    @comments = @recipe.comments.includes(:user, replies: [:user, {myreply: :user}]).order(created_at: :desc)
    @comment = @recipe.comments.new
    @comment_reply = @recipe.comments.new
    @replies = Comment.includes(:user).where.not(reply_to_id: nil)
    @parent_comments = @comments.where(parent_id:nil)
	end

  def edit
    @recipe = Recipe.find(params[:id])
    set_step_build
  end

  def update
    @recipe = Recipe.find(params[:id])
    if @recipe.update(recipe_params_carry_up_number)
      # 更新に成功した時の処理
      redirect_to @recipe, notice: 'レシピを更新しました。'
    else
      # 更新に失敗した時の処理
      render :edit
    end
  end

  # 新しいレシピの投稿フォームを表示
  def new
    @recipe = Recipe.new
    @process_number = 0
		set_step_build
    logger.debug("#{@process_number} + contloll" )
  end

  # フォームから送られてきたデータでレシピを作成
  def create
    @recipe = Recipe.new(recipe_params_carry_up_number)
    if @recipe.save
      #ThumbnailProcessJob.perform_later(@recipe.id)
      
      @recipe.thumbnail_edited_set
      
      redirect_to recipe_path(@recipe), flash: { success: 'レシピが正常に投稿されました。' }
    else
      flash.now[:danger] = 'レシピの投稿に失敗しました。'
      set_step_build
      render :new, status: :see_other
    end
  end

  def destroy
    recipe = Recipe.find(params[:id])
    recipe.destroy
  end

  private

  # Strong Parameters
  def recipe_params
    params.require(:recipe).permit(:name, :thumbnail, :thumbnail_edited, :introduce, :copy_permission, :likescount, steps_attributes: [:id, :number, :description])
  end

  def set_process_number
    @process_number = 0
  end

  def set_step_build
    6.times {
      @process_number += 1
			@step = @recipe.steps.build
		}
  end

  def recipe_params_carry_up_number
    # まず、通常通りにparamsを取得
    params.require(:recipe).permit(:name, :thumbnail, :thumbnail_edited, :introduce, steps_attributes: [:id, :number, :description]).tap do |whitelisted|
      # steps_attributesがあれば、descriptionが空のものを除外
      if whitelisted[:steps_attributes]
        whitelisted[:steps_attributes].each do |key, step_attribute|
          if step_attribute[:description].blank?
            whitelisted[:steps_attributes].delete(key)
          end
        end
         # descriptionが空でないsteps_attributesのnumberを繰り上げる
        whitelisted[:steps_attributes].values.each_with_index do |step_attribute, index|
          step_attribute[:number] = index + 1
        end
      end
    end
  end

end
