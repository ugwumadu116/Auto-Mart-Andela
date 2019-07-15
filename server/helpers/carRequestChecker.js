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
    img_url,
  } = req.body;

  if ((img_url === '' || img_url === undefined) && (req.file === undefined || !req.file.originalname.match(/\.(jpg|jpeg|png|gif)$/i))) {
    groupError.img_url = 'Car image file or image url is required NOTE: only image (jpg, jpeg, png, gif) files are allowed!';
  }
  if (manufacturer === '' || manufacturer === undefined || manufacturer.length <= 1) {
    groupError.manufacturer = 'Car manufacturer with minimum of 2 characters long is required';
  }
  if (model === '' || model === undefined || model.length <= 1) {
    groupError.model = 'Car model with minimum of 2 characters long is required';
  }
  if (price === '' || price === undefined || isNaN(price)) {
    groupError.price = 'Car price must be numbers only and is required';
  }
  if (body_type === '' || body_type === undefined || !body_type.match(/^car$|^truck$|^trailer$|^van$/i)) {
    groupError.body_type = 'Car body type should be car or truck or van or trailer and is required';
  }
  if (state === '' || state === undefined || !state.match(/^new$|^old$/i)) {
    groupError.state = 'Car state should be new or old and is required';
  }

  return groupError;
};

export default {
  upload,
  checkCar,
};
