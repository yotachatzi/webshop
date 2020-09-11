const UserSchema = {
  name: 'Users',
  fields: [
    {
      fieldName: 'email',
      type: 'varchar',
      length: 255,
      unique: true,
      required: true,
    },
  ],
};

const PasswordSchema = {
  name: 'Passwords',
  fields: [
    {
      fieldName: 'hashedPassword',
      type: 'varchar',
      required: true,
    },
    {
      fieldName: 'userId',
      type: 'uuid',
      required: true,
      relation: 'Users',
    },
  ],
};

module.exports = { UserSchema, PasswordSchema };
