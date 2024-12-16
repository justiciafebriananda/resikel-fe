import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const databases = [
  { name: "RESIKEL_DEMO" },
  { name: "RESIKEL_PRODUCTION" },
];

const DatabaseManagement = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [formData, setFormData] = useState({
    masterPassword: "",
    databaseName: "",
    backupFormat: "",
    newName: "",
    email: "",
    password: "",
    file: null,
    newMasterPassword: "",
  });

  const handleOpenDialog = (action) => {
    setActionType(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData({
      masterPassword: "",
      databaseName: "",
      backupFormat: "",
      newName: "",
      email: "",
      password: "",
      file: null,
      newMasterPassword: "",
    });
  };

  return (
    <div className="container mx-auto mt-24 p-4 max-w-2xl">
      <Card className="p-4">
        <div className="flex justify-center mb-4">
          <img src="/images/resikel.png" alt="Resikel Logo" className="h-16" />
        </div>

        <CardContent>
          {databases.map((db, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{db.name}</span>
              <div className="space-x-2">
                <Button size="sm" onClick={() => handleOpenDialog("backup")}>
                  Backup
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleOpenDialog("duplicate")}>
                  Duplicate
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleOpenDialog("delete")}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>

        <CardFooter className="flex space-x-2 mt-4">
          <Button size="sm" className="flex-1" onClick={() => handleOpenDialog("create")}>
            Create Database
          </Button>
          <Button size="sm" className="flex-1" onClick={() => handleOpenDialog("restore")}>
            Restore Database
          </Button>
          <Button size="sm" className="flex-1" onClick={() => handleOpenDialog("setMasterPassword")}>
            Set Master Password
          </Button>
        </CardFooter>
      </Card>

      {/* Dialog Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div />
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>{actionType === "backup" && "Backup Database"}</DialogTitle>
          <DialogDescription>
            <div className="space-y-4">
              {/* Backup Form */}
              {actionType === "backup" && (
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Master Password</label>
                    <Input
                      placeholder="Master Password"
                      value={formData.masterPassword}
                      onChange={(e) => setFormData({ ...formData, masterPassword: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Database Name</label>
                    <Input
                      placeholder="Database Name"
                      value={formData.databaseName}
                      onChange={(e) => setFormData({ ...formData, databaseName: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Backup Format</label>
                    <Input
                      placeholder="Backup Format"
                      value={formData.backupFormat}
                      onChange={(e) => setFormData({ ...formData, backupFormat: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Duplicate Form */}
              {actionType === "duplicate" && (
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Master Password</label>
                    <Input
                      placeholder="Master Password"
                      value={formData.masterPassword}
                      onChange={(e) => setFormData({ ...formData, masterPassword: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Database Name</label>
                    <Input
                      placeholder="Database Name"
                      value={formData.databaseName}
                      onChange={(e) => setFormData({ ...formData, databaseName: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">New Name</label>
                    <Input
                      placeholder="New Name"
                      value={formData.newName}
                      onChange={(e) => setFormData({ ...formData, newName: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Delete Form */}
              {actionType === "delete" && (
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Master Password</label>
                    <Input
                      placeholder="Master Password"
                      value={formData.masterPassword}
                      onChange={(e) => setFormData({ ...formData, masterPassword: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Database</label>
                    <Input
                      placeholder="Database"
                      value={formData.databaseName}
                      onChange={(e) => setFormData({ ...formData, databaseName: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Create Database Form */}
              {actionType === "create" && (
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Master Password</label>
                    <Input
                      placeholder="Master Password"
                      value={formData.masterPassword}
                      onChange={(e) => setFormData({ ...formData, masterPassword: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Database Name</label>
                    <Input
                      placeholder="Database Name"
                      value={formData.databaseName}
                      onChange={(e) => setFormData({ ...formData, databaseName: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      placeholder="Password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Restore Database Form */}
              {actionType === "restore" && (
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Master Password</label>
                    <Input
                      placeholder="Master Password"
                      value={formData.masterPassword}
                      onChange={(e) => setFormData({ ...formData, masterPassword: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">File</label>
                    <Input
                        className="bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                        placeholder="File"
                        type="file"
                        onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Database Name</label>
                    <Input
                      placeholder="Database Name"
                      value={formData.databaseName}
                      onChange={(e) => setFormData({ ...formData, databaseName: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Set Master Password Form */}
              {actionType === "setMasterPassword" && (
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Current Master Password</label>
                    <Input
                      placeholder="Current Master Password"
                      value={formData.masterPassword}
                      onChange={(e) => setFormData({ ...formData, masterPassword: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">New Master Password</label>
                    <Input
                      placeholder="New Master Password"
                      value={formData.newMasterPassword}
                      onChange={(e) => setFormData({ ...formData, newMasterPassword: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>
          </DialogDescription>

          <div className="mt-4 flex justify-end">
            <Button variant="secondary" onClick={handleCloseDialog}>
              Close
            </Button>
            <Button className="ml-2">Continue</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatabaseManagement;