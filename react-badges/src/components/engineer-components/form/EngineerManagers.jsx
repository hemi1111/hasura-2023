import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

const EngineerManagers = ({ onClose, edit, managers, onAdd, manager }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({ mode: "onChange" });

  const handleFormSubmit = (data) => {
    reset();
    onAdd(data);
  };

  return (
    <Box
      component="form"
      sx={{ m: 1, width: "40ch" }}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Controller
        name={manager ? "engineer" : "manager"}
        control={control}
        defaultValue=""
        rules={{
          required: { value: true, message: "Field is required" }
        }}
        render={({ field }) => (
          <FormControl
            sx={{
              display: "flex"
            }}
          >
            {edit ? (
              <InputLabel>Change {manager ? "engineer" : "manager"}</InputLabel>
            ) : (
              <InputLabel>Add {manager ? "engineer" : "manager"}</InputLabel>
            )}
            <Select
              label={edit ? "Change manager" : "Add manager"}
              {...field}
              error={!!errors.manager}
            >
              {managers?.map((manager, index) => {
                return (
                  <MenuItem key={index} value={manager.id}>
                    {manager.name}
                  </MenuItem>
                );
              })}
            </Select>
            {
              <FormHelperText>
                {errors.manager && errors.manager.message}
              </FormHelperText>
            }
          </FormControl>
        )}
      />

      {edit ? (
        <>
          <Button sx={{ marginBottom: 2, width: "50%" }} onClick={onClose}>
            CANCEL
          </Button>
          <Button
            color="success"
            sx={{ marginBottom: 2, width: "50%" }}
            type="submit"
          >
            EDIT
          </Button>
        </>
      ) : (
        <Button sx={{ marginBottom: 2, width: "100%" }} type="submit">
          ADD
        </Button>
      )}
    </Box>
  );
};

export default EngineerManagers;
