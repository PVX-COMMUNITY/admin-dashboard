import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    deleteData: { id: string, oragnism: string, name: string | undefined } | null;
    onDelete: () => void;
    onCancel: () => void;
}

export function DialogDelete(props: Props) {
    const { open, setOpen, deleteData, onDelete, onCancel } = props;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]" >
                <DialogHeader>
                    <DialogTitle>Delete {deleteData?.oragnism}</DialogTitle>
                    <DialogDescription>Are you sure you want to delete {deleteData?.oragnism.toLowerCase()} {deleteData?.name} ?</DialogDescription>
                    <div className="btn-container !flex !justify-end ">
                        <Button className="mt-2 mr-2 !text-black !bg-gray-100" type="submit" onClick={onCancel} >
                            Cancel
                        </Button>
                        <Button className=" mt-2 !bg-red-500 !text-gray-100" type="submit" onClick={onDelete}>
                            Delete
                        </Button>
                    </div>

                </DialogHeader>
            </DialogContent>
        </Dialog >
    )
}