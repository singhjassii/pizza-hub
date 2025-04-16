import { Button } from "@/components/ui/button";

import { Trash2, X } from "lucide-react";

function DeleteConfirmationModal({ setDeleteConfirmationModal, deleteRole }) {
  return (
    <div className="bg-main-bg-color p-10 rounded-xl flex flex-col gap-3">
      <p className="text-field-text-color text-xl font-semibold text-center">
        Are You sure ?
      </p>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="ml-auto dark:bg-main-bg-color dark:text-white"
          onClick={() => setDeleteConfirmationModal(false)}
        >
          <span className="text-[18px] mr-2 text-black dark:text-white">
            <X size={18} />
          </span>
          Cancel
        </Button>
        <form action={deleteRole}>
          <Button
            variant="outline"
            className="ml-auto dark:bg-main-bg-color dark:text-white"
          >
            <span className="text-[18px] mr-2 text-black dark:text-white">
              <Trash2 size={18} />
            </span>
            Delete Forever
          </Button>
        </form>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
