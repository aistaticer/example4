class Step < ApplicationRecord
	belongs_to :recipe
	validates :description, presence: true, length: { maximum: 255 }
end
