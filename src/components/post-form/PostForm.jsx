import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

   

   const submit = async (data) => {
  if (!userData || !userData.$id) {
    toast.error("User not logged in.");
    return;
  }

  try {
    let fileId = null;

    if (data.image && data.image[0]) {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) fileId = file.$id;
    }

    if (post) {
      const updatedPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: fileId || post.featuredImage,
      });

      if (updatedPost) {
        toast.success("Post updated!");
        navigate(`/post/${updatedPost.$id}`);
      } else {
        toast.error("Failed to update post.");
      }
    } else {
      const newPost = await appwriteService.createPost({
        ...data,
        featuredImage: fileId,
        userId: userData.$id,
      });

      if (newPost) {
        toast.success("Post created successfully!");
        navigate("/", { replace: true }); // ✅ this avoids lingering history
      } else {
        toast.error("Failed to create post.");
      }
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong.");
  }
};



    const slugTransform = useCallback((value) => {
        return value?.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-") || "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    if (!userData?.$id) {
        return <p className="text-red-500 font-semibold">You must be logged in to create or edit a post.</p>;
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input label="Title :" placeholder="Title" className="mb-4" {...register("title", { required: true })} />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFileUrl(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
