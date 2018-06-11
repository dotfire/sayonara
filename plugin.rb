# name: sayonara
# about: Say goodbye to social media
# version: 0.0.1
# authors: Jon Stokes

after_initialize do

  module ::Sayonara
    PLUGIN_NAME ||= "sayonara"

    class Engine < ::Rails::Engine
      engine_name PLUGIN_NAME
      isolate_namespace Sayonara
    end
  end

  require_dependency 'user_action'

  class ::UserAction
    module SayonaraShowBookmarks
      def apply_common_filters(builder, user_id, guardian, ignore_private_messages = false)
        super(builder, user_id, guardian, ignore_private_messages)

        unless guardian.can_see_notifications?(User.where(id: user_id).first)
          selected = builder.instance_variable_get("@sections")
          selected[:where] && selected[:where].delete("a.action_type not in (#{::UserAction::BOOKMARK})")
        end
      end
    end
    singleton_class.prepend SayonaraShowBookmarks
  end
end
