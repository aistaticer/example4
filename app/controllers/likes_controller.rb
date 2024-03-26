# app/controllers/likes_controller.rb
class LikesController < ApplicationController
  before_action :authenticate_user!

  def create
    @recipe = Recipe.find(params[:recipe_id])
    current_user.liked_recipes << @recipe

    respond_to do |format|

      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.replace("unliked_button_#{@recipe.id}", partial: 'shared/liked_button', locals: { recipe: @recipe }),
          turbo_stream.replace("likes_count_#{@recipe.id}", partial: 'shared/likes_count', locals: { recipe: @recipe })
        ]
      end
      format.html { redirect_to recipes_path }
    end
  end

  def destroy
    @recipe = Recipe.find(params[:recipe_id])
    current_user.liked_recipes.delete(@recipe)
    
    # ここで@recipeを再読み込み
    @recipe.reload
    respond_to do |format|

      format.turbo_stream do
				
        render turbo_stream: [
          turbo_stream.replace("liked_button_#{@recipe.id}", partial: 'shared/unliked_button', locals: { recipe: @recipe }),
        	#turbo_stream.replace("likes_count_#{@recipe.id}", partial: 'shared/likes_count', locals: { recipe: @recipe })
          turbo_stream.replace("likes_count_#{@recipe.id}", partial: 'shared/likes_count', locals: { recipe: @recipe })
        ]
      end
      format.html { redirect_to recipes_path }
    end
  end
end
