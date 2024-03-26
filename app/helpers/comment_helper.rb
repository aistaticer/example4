module CommentHelper
		# コメントとその返信を表示するための再帰的ヘルパーメソッド例
	def render_comments_with_replies(comments)
		render partial: 'shared/comments/comment_body', collection: @comments do |comment|
			content_tag(:div, class: "comment") do
				render(comment) + (comment.replies.any? ? render_comments_with_replies(comment.replies) : "")
			end
		end
	end
end
