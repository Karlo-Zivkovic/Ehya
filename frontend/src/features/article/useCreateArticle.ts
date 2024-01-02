import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArticle as createArticleApi } from "../../services/articleApi";
import toast from "react-hot-toast";

export default function useCreateArticle() {
  const queryclient = useQueryClient();
  const { mutate: creatingArticle, isPending: isCreatingArticle } = useMutation(
    {
      mutationFn: ({
        title,
        caption,
        photo,
        token,
        slug,
        _id,
      }: {
        title: string;
        caption: string;
        photo: File;
        token: string;
        slug: string;
        _id: string;
      }) =>
        createArticleApi({
          title,
          caption,
          photo,
          token,
          slug,
          _id,
        }),
      onSuccess: () => {
        toast.success("Article successfully created");
        queryclient.invalidateQueries({ queryKey: ["articles"] });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );
  return { creatingArticle, isCreatingArticle };
}
