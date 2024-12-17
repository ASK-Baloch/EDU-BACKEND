import bcrypt from "bcrypt";
import { SuperAdmin } from "../../models/super_admin.models.js";

export const seedSuperAdmin = async () => {
  const email = "superadmin@example.com";
  const password = "SuperSecretPassword123";

  const existingSuperAdmin = await SuperAdmin.findOne({ email });
  if (!existingSuperAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await SuperAdmin.create({
      name: "Super Admin",
      email,
      password: hashedPassword,
      role: "super_admin",
      isHardcoded: true,
    });
    console.log("Hardcoded super admin created");
  }
};
