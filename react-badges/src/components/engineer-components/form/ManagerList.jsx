import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import { Controller } from "react-hook-form";

const ManagerList = ({ form, managers, onAdd }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = form;

  const handleFormSubmit = (data) => {
    console.log(data);
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
        name="manager"
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
            <InputLabel>Add manager</InputLabel>
            <Select label="Add manager" {...field} error={!!errors.manager}>
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

      <Button sx={{ marginBottom: 2, width: "100%" }} type="submit">
        ADD
      </Button>
    </Box>
  );
};

export default ManagerList;
