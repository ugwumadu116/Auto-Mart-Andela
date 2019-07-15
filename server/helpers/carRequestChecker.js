import multer from 'multer';


const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

const checkCar = (req) => {
  const groupError = {};
  const {
    manufacturer,
    model,
    price,
    body_type,
    state,
  } = req.body;
  if (manufacturer === '' || manufacturer === undefined) {
    groupError.manufacturer = 'Car manufacturer with minimum of 2 characters long is required';
  }
  if (model === '' || model === undefined) {
    groupError.model = 'Car model with minimum of 2 characters long is required';
  }
  if (price === '' || price === undefined) {
    groupError.price = 'Car price must be numbers only and is required';
  }
  if (body_type === '' || body_type === undefined) {
    groupError.body_type = 'Car body type should be car or truck or van or trailer and is required';
  }
  if (state === '' || state === undefined) {
    groupError.state = 'Car state should be new or old and is required';
  }
  return groupError;
};

export default {
  upload,
  checkCar,
};
