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
    name,
    manufacturer,
    model,
    price,
    body_type,
    state,
  } = req.body;
  const carName = Array.isArray(name) ? name[0] : name;
  const carManufacturer = Array.isArray(manufacturer) ? manufacturer[0] : manufacturer;
  const carModel = Array.isArray(model) ? model[0] : model;
  const carPrice = Array.isArray(price) ? price[0] : price;
  const carBodyType = Array.isArray(body_type) ? body_type[0] : body_type;
  const carState = Array.isArray(state) ? state[0] : state;
  if (req.file === undefined || !req.file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    groupError['image_url'] = 'Car image is required only image (jpg, jpeg, png, gif) files are allowed!';
  }
  if (carName === '' || carName === undefined || carName.length <= 1) {
    groupError['name'] = 'Car name with minimum of 2 characters long is required';
  }
  if (carManufacturer === '' || carManufacturer === undefined || carManufacturer.length <= 1) {
    groupError['manufacturer'] = 'Car manufacturer with minimum of 2 characters long is required';
  }
  if (carModel === '' || carModel === undefined || carModel.length <= 1) {
    groupError['model'] = 'Car model with minimum of 2 characters long is required';
  }
  if (carPrice === '' || carPrice === undefined || isNaN(carPrice)) {
    groupError['price'] = 'Car price must be numbers only and is required';
  }
  if (carBodyType === '' || carBodyType === undefined || !carBodyType.match(/^car$|^truck$|^trailer$|^van$/i)) {
    groupError['body_type'] = 'Car body type should be car or truck or van or trailer and is required';
  }
  if (carState === '' || carState === undefined || !carState.match(/^new$|^old$/i)) {
    groupError['state'] = 'Car state should be new or old and is required';
  }
  return groupError;
};

export default {
  upload,
  checkCar,
};
