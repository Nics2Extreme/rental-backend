const Billing = require("../model/Billing");
const User = require("../model/User");

const getAllBillings = async (req, res) => {
  const billings = await Billing.find();
  if (!billings) return res.status(204).json({ message: "No billing found" });
  res.json(billings);
};

const getBilling = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Billing ID required" });
  const billing = await Billing.find({ tenant: req.params.id }).exec();
  if (!billing) {
    return res
      .status(204)
      .json({ message: `Billing ID ${req.params.id} not found` });
  }
  res.json(billing);
};

const addBilling = async (req, res) => {
  const { rent, latestElec, latestWat, int, tenant, unit } = req.body;
  const currentMonth = new Date().getMonth() + 1; // Get the current month (1-12)
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1; // Calculate the previous month

  try {
    //update and store the new user
    const foundDocuments = await Billing.find({
      tenant: req.body.tenant,
    });

    const duplicate = await Billing.find({
      tenant: req.body.tenant,
      $expr: {
        $eq: [{ $month: "$date" }, currentMonth],
      }
    })

    console.log(currentMonth);

    if (duplicate.length > 0)
      return res
        .status(409)
        .json({ success: `Billing for this month already exists!` });

    if (foundDocuments.length !== 0) {
      const result = await Billing.findOne({
        $expr: {
          $eq: [{ $month: "$date" }, previousMonth],
        },
      }).then((foundBilling) => {
        const billing = Billing.create({
          rent: rent,
          latestElec: latestElec,
          prevElec: foundBilling.latestElec,
          latestWat: latestWat,
          prevWat: foundBilling.latestWat,
          int: int,
          tenant: tenant,
          unit: unit
        });
        console.log(billing);
      });
      return res.status(201).json({ success: `Billing created!` });
    } else {
      const result = await Billing.create({
        rent: rent,
        latestElec: latestElec,
        prevElec: latestElec,
        latestWat: latestWat,
        prevWat: latestWat,
        int: int,
        tenant: tenant,
        unit: unit
      });
      return res.status(201).json({ success: `Billing created!` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBillingsWithTenant = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Billing ID required" });
  const billing = await Billing.find({ tenant: req.params.id })
    .populate("tenant")
    .exec();
  if (!billing) {
    return res
      .status(204)
      .json({ message: `Unit ID ${req.params.id} not found` });
  }
  res.json(billing);
};

module.exports = {
  getAllBillings,
  getBilling,
  addBilling,
  getBillingsWithTenant,
};
