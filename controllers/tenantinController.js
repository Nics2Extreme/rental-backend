const Tenantin = require("../model/Tenantin");

const getAllIn = async (req, res) => {
  const inForms = await Tenantin.find();
  if (!inForms)
    return res.status(204).json({ message: "No tenant-in forms found" });
  res.json(inForms);
};

const getIn = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Tenant ID required" });
  const inForm = await Tenantin.findOne({ tenant: req.params.id }).exec();
  if (!inForm) {
    return res
      .status(204)
      .json({ message: `Tenant-in form ID ${req.params.id} not found` });
  }
  res.json(inForm);
};

const addIn = async (req, res) => {
  const {
    tenant,
    door,
    wall,
    stairs,
    floor,
    gatekey,
    doorkey,
    sockets,
    watersub,
    elecsub,
    swit,
    braker,
    sink,
    lights,
    window,
    faucet,
    bowl,
    ceiling,
  } = req.body;
  if (!tenant)
    return res.status(400).json({ message: "Tenant ID must not be empty." });

  try {
    //create and store the new user
    const result = await Tenantin.create({
      tenant: tenant,
      door: door,
      wall: wall,
      stairs: stairs,
      floor: floor,
      gatekey: gatekey,
      doorkey: doorkey,
      sockets: sockets,
      watersub: watersub,
      elecsub: elecsub,
      switch: swit,
      braker: braker,
      sink: sink,
      lights: lights,
      window: window,
      faucet: faucet,
      bowl: bowl,
      ceiling: ceiling,
    });

    console.log(result);

    res.status(201).json({ success: `Tenant-in form successfully sent!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllIn,
  getIn,
  addIn,
};
