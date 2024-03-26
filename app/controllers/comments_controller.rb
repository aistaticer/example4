class CommentsController < ApplicationController
  before_action :set_recipe

  

  def create
    @comment = @recipe.comments.build(comment_params)
    @comment.user = current_user

    # 返信コメントの作成
    #@comment_reply = @recipe.comments.new
  
    respond_to do |format|
      if @comment.save
        index = @recipe.comments.count
        Rails.logger.debug "あああああああああああ #{index}"
        format.html { redirect_to @recipe, notice: 'コメントを追加しました。' }
        format.turbo_stream do
          render turbo_stream: turbo_stream.prepend(
            "comment_form_after",
            partial: 'shared/comment/comment_body',
            locals: { recipe: @recipe, comment: @comment, index: index}
          )
        end
      else
        format.html { redirect_to @recipe, alert: 'コメントの追加に失敗しました。' }
        format.turbo_stream { render turbo_stream: turbo_stream.append('errors', partial: 'shared/errors', locals: { object: @comment }) }
      end
    end
  end

  def destroy
    @comment = @recipe.comments.find(params[:id])
    @comment_reply = @recipe.comments.new
  
    if @comment.user == current_user
      @comment.destroy
    end

    respond_to do |format|
      format.html { redirect_to @recipe, notice: 'コメントを削除しました。' }
      format.turbo_stream do
        render turbo_stream: turbo_stream.remove("comment_#{@comment.id}")
      end
    end
    #redirect_to @recipe, notice: 'コメントを削除しました。'
  end

  private
    def set_recipe
      @recipe = Recipe.find(params[:recipe_id])
    end

    def comment_params
      params.require(:comment).permit(:body, :parent_id, :reply_to_id)
    end
end
