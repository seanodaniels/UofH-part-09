import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddEntriesForm from "./AddEntriesForm";
import { PatientEntriesValues } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientEntriesValues) => Promise<void>;
  error?: string;
}

const AddEntriesModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntriesForm onSubmit={onSubmit} onCancel={onClose}/>
    </DialogContent>
  </Dialog>
);

export default AddEntriesModal;