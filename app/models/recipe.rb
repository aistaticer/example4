class Recipe < ApplicationRecord
	has_many :steps
	accepts_nested_attributes_for :steps
	enum copy_permission: { not_allowed: 0, allowed: 1 }
end
