import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ProfileImageSection = () => {
  const { control, watch } = useFormContext();

  const existingImageUrl = watch("profileImageUrl"); // ✅ Correct key

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Profile Image</h2>
        <FormDescription className="text-gray-600">
          Upload a profile image that will be displayed on your profile page.
          Uploading a new image will replace the current one.
        </FormDescription>
      </div>

      <div className="flex flex-col gap-4 md:w-[10%]">
        {existingImageUrl && (
          <AspectRatio ratio={1 / 1}>
            <img
              src={existingImageUrl}
              alt="Current Profile"
              className="rounded-md object-cover h-full w-full border border-gray-300"
            />
          </AspectRatio>
        )}

        <FormField
          control={control}
          name="profileImageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={(event) =>
                    field.onChange(event.target.files?.[0] || null)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ProfileImageSection;
