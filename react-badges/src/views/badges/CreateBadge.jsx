import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_BADGES, GET_BADGES } from "../../queries/BadgesQueries";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateBadge = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "requirements"
  });

  const [addBadges] = useMutation(ADD_BADGES, {
    refetchQueries: [{ query: GET_BADGES }]
  });
  console.log(addBadges);

  const onSubmit = (data) => {
    const { badgeTitle, badgeDescription, requirements } = data;
    const created_by = 1;

    try {
      addBadges({
        variables: {
          title: badgeTitle,
          description: badgeDescription,
          requirements: requirements.map((req) => ({
            title: req.title,
            description: req.description
          })),
          created_by: created_by
        }
      });
      navigate("/badges");
      console.log("Badge added successfully!");
    } catch (error) {
      console.error("Error adding badge:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Badge Title"
          {...register("badgeTitle")}
        />
        <br />

        <input
          type="text"
          placeholder="Badge Description"
          {...register("badgeDescription")}
        />
        <br />

        <h3>Requirements</h3>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              type="text"
              placeholder={`Requirement Title ${index + 1}`}
              {...register(`requirements.${index}.title`)}
            />
            <br />

            <input
              type="text"
              placeholder={`Requirement Description ${index + 1}`}
              {...register(`requirements.${index}.description`)}
            />
            <br />

            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
            <br />
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ title: "", description: "" })}
        >
          Add Requirement
        </button>
        <br />

        <button type="submit">Add Badge</button>
      </form>
    </div>
  );
};

export default CreateBadge;
