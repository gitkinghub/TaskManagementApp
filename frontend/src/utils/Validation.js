export const validateLogin = (values) => {
  let errors = {};

  if (!values.username) {
    errors.username = "Username is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

export const validateSignUp = (values) => {
  let errors = {};

  if (!values.username) {
    errors.username = "Username is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const validateTaskSetting = (values) => {
  let errors = {};

  if (!values.username) {
    errors.username = "Username is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  return errors;
};

// Additional validation functions from the other file
export const validateConfirmationDialog = (values) => {
  let errors = {};
  if (!values.reason) {
    errors.reason = "Reason is required";
  }

  return errors;
};

export const validateConfirmationDialogNoValidation = (values) => {
  let errors = {};
  return errors;
};

export const validateTask = (values) => {
  console.log(values);
  let errors = {};

  if (!values.taskName) {
    errors.taskName = "Task Name is required";
  }
  if (!values.category) {
    errors.category = "Category is required";
  }
  if (!values.startDate) {
    errors.startDate = "Start Date is required";
  }
  if (!values.startTime) {
    errors.startTime = "Start Time is required";
  }
  if (!values.endDate) {
    errors.endDate = "End Date is required";
  }
  if (!values.endTime) {
    errors.endTime = "End Time is required";
  }
  if (!values.description) {
    errors.description = "Description is required";
  }
  if (!values.status) {
    errors.status = "Status is required";
  }

  return errors;
};

export const validateEvent = (values) => {
  console.log(values);
  let errors = {};

  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.start) {
    errors.start = "Start Date is required";
  }
  if (!values.end) {
    errors.end = "End Date is required";
  }
  if (!values.status) {
    errors.status = "Status is required";
  }
  if (!values.color) {
    errors.color = "Color is required";
  }
  if (!values.description) {
    errors.description = "Description is required";
  }

  return errors;
};

export const validateTaskPasswordSettings = (values) => {
  console.log(values);
  let errors = {};

  if (!values.newPassword) {
    errors.newPassword = "Please enter new password";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Please enter current password";
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
