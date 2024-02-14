class RecipesController < ApplicationController
  before_action :set_process_number, only: %i[new create]

  # レシピの一覧を表示
  def index
    @recipes = Recipe.all
  end

	def show
		@recipe = Recipe.find(params[:id])
	end

  # 新しいレシピの投稿フォームを表示
  def new
    @recipe = Recipe.new
		3.times {
      @process_number += 1
			@step = @recipe.steps.build
		}
  end

  # フォームから送られてきたデータでレシピを作成
  def create
    @recipe = Recipe.new(recipe_params)
    if @recipe.save
      redirect_to new_recipe_path, flash: { success: 'レシピが正常に投稿されました。' }
    else
      render :new
    end
  end

  private

  # Strong Parameters
  def recipe_params
    params.require(:recipe).permit(:name, :thumbnail, :copy_permission, steps_attributes: [:number, :description])
  end

  def set_process_number
    @process_number = 0
  end

end
