class ThumbnailProcessJob < ApplicationJob
  queue_as :default

  def perform(record_id)
    record = Recipe.find_by(id: record_id)
    return unless record

    if record.thumbnail.attached? && record.thumbnail_edited.blank?
      downloaded_image = record.thumbnail.download

      image = MiniMagick::Image.read(downloaded_image)
			image.crop("100x100+0+0")
			processed_image = StringIO.new(image.to_blob)
      file = { io: processed_image, filename: 'thumbnail_edited.jpg', content_type: 'image/jpeg' }
      record.thumbnail_edited.attach(file)
    end
  end
end
