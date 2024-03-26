class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
	validates :name, presence: true
	validates :email, presence: true

  has_many :likes
  has_many :liked_recipes, through: :likes, source: :recipe
  has_many :comments, dependent: :destroy
end
