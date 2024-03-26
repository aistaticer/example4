class Recipe < ApplicationRecord
	has_many :steps, dependent: :destroy
	has_one_attached :thumbnail
	has_one_attached :thumbnail_edited
  has_many :comments, dependent: :destroy

  has_many :likes
  has_many :liking_users, through: :likes, source: :user

	accepts_nested_attributes_for :steps
	enum copy_permission: { not_allowed: 0, allowed: 1 }

	validates :name, presence: true, length: { maximum: 255 }
	validates :introduce, presence: true, length: { maximum: 255 }

	#after_commit :thumbnail_edited_set, on: [:create, :update]

  def thumbnail_edited_set
    if self.thumbnail.attached? && self.thumbnail_edited.blank?
      puts "ああああああああああああああああああああああああああああああああああああああああ"
      downloaded_image = self.thumbnail.download

      image = MiniMagick::Image.read(downloaded_image)
      image.crop("100x100+0+0")
      processed_image = StringIO.new(image.to_blob)
      file = { io: processed_image, filename: 'thumbnail_edited.jpg', content_type: 'image/jpeg' }
      self.thumbnail_edited.attach(file)
    end
  end



end
