import * as shortcut from "dev/shortcuts";
import * as response from "dev/responses";
import { app } from "dev/app";

shortcut.dashboard([response.clusterStatus.actions]);

app.addConstraintRemote((req, res) => {
  if (req.body.c_type === "ord" && req.body.res_id === "fail") {
    res
      .status(400)
      .send("Error adding constraint: Error: something wrong in pcs command");
    return;
  }

  if (req.body.c_type === "ord") {
    res.send("Successfully added constraint");
    return;
  }

  // location
  if (req.body.score > 100) {
    res
      .status(400)
      .send("Error adding constraint: Error: something wrong in pcs command");
    return;
  }
  res.send("Successfully added constraint");
});

app.addConstraintRuleRemote((req, res) => {
  if (req.body.score > 100) {
    res
      .status(400)
      .send("Error adding constraint: Error: something wrong in pcs command");
    return;
  }
  res.send("Successfully added constraint");
});
