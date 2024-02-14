class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    logger.debug("あああああ")
    if @user.save
      redirect_to users_show_path, flash: { success: "ユーザーの新規登録に成功しました" }
    else
      flash.now[:danger] = 'ユーザーの新規登録に失敗しました'
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    redirect_to(users_new_path) unless @user
  end

  private

    def user_params
      params.require(:user).permit(:name, :email)
    end
end
