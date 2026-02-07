import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, createUser, deleteUser, ApiError } from "@/lib/api";
import type { User } from "@repo/shared";
import { toast } from "sonner";

const USERS_KEY = ["users"] as const;

export function useUsers() {
  return useQuery<User[]>({
    queryKey: USERS_KEY,
    queryFn: fetchUsers,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
      toast.success(`User "${user.name}" created`);
    },
    onError: (err) => {
      const message =
        err instanceof ApiError
          ? err.body.message ?? err.body.error
          : "Failed to create user";
      toast.error(message);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
      toast.success("User deleted");
    },
    onError: (err) => {
      const message =
        err instanceof ApiError
          ? err.body.message ?? err.body.error
          : "Failed to delete user";
      toast.error(message);
    },
  });
}
