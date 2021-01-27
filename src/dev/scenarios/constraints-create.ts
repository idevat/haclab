import * as shortcut from "dev/shortcuts";
import * as response from "dev/responses";
import { app } from "dev/app";

shortcut.dashboard([response.clusterStatus.actions]);

app.addConstraintRemote((req, res) => {
  if (req.body.score > 100) {
    res
      .status(400)
      .send("Error adding constraint: Error: something wrong in pcs command");
    return;
  }
  res.send("Successfully added constraint");

  return [400, ""];
});
