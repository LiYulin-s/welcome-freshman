import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ProfilePlain = t.Object(
  {
    id: t.String(),
    userId: t.String(),
    name: t.String(),
    gender: t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
      additionalProperties: false,
    }),
    studentNum: t.String(),
    phone: t.String(),
    qq: t.String(),
    school: t.String(),
    major: t.String(),
    intention: t.String(),
    reason: t.String(),
    bio: t.String(),
    interest: t.String(),
    skills: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const ProfileRelations = t.Object(
  {
    user: __nullable__(
      t.Object(
        {
          id: t.String(),
          name: t.String(),
          email: t.String(),
          emailVerified: t.Boolean(),
          image: __nullable__(t.String()),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          profileId: __nullable__(t.String()),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const ProfilePlainInputCreate = t.Object(
  {
    name: t.String(),
    gender: t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
      additionalProperties: false,
    }),
    studentNum: t.String(),
    phone: t.String(),
    qq: t.String(),
    school: t.String(),
    major: t.String(),
    intention: t.String(),
    reason: t.String(),
    bio: t.String(),
    interest: t.String(),
    skills: t.String(),
  },
  { additionalProperties: false },
);

export const ProfilePlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    gender: t.Optional(
      t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
        additionalProperties: false,
      }),
    ),
    studentNum: t.Optional(t.String()),
    phone: t.Optional(t.String()),
    qq: t.Optional(t.String()),
    school: t.Optional(t.String()),
    major: t.Optional(t.String()),
    intention: t.Optional(t.String()),
    reason: t.Optional(t.String()),
    bio: t.Optional(t.String()),
    interest: t.Optional(t.String()),
    skills: t.Optional(t.String()),
  },
  { additionalProperties: false },
);

export const ProfileRelationsInputCreate = t.Object(
  {
    user: t.Optional(
      t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const ProfileRelationsInputUpdate = t.Partial(
  t.Object(
    {
      user: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const ProfileWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          userId: t.String(),
          name: t.String(),
          gender: t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
            additionalProperties: false,
          }),
          studentNum: t.String(),
          phone: t.String(),
          qq: t.String(),
          school: t.String(),
          major: t.String(),
          intention: t.String(),
          reason: t.String(),
          bio: t.String(),
          interest: t.String(),
          skills: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Profile" },
  ),
);

export const ProfileWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), userId: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ userId: t.String() })],
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              userId: t.String(),
              name: t.String(),
              gender: t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
                additionalProperties: false,
              }),
              studentNum: t.String(),
              phone: t.String(),
              qq: t.String(),
              school: t.String(),
              major: t.String(),
              intention: t.String(),
              reason: t.String(),
              bio: t.String(),
              interest: t.String(),
              skills: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Profile" },
);

export const ProfileSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      user: t.Boolean(),
      userId: t.Boolean(),
      name: t.Boolean(),
      gender: t.Boolean(),
      studentNum: t.Boolean(),
      phone: t.Boolean(),
      qq: t.Boolean(),
      school: t.Boolean(),
      major: t.Boolean(),
      intention: t.Boolean(),
      reason: t.Boolean(),
      bio: t.Boolean(),
      interest: t.Boolean(),
      skills: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ProfileInclude = t.Partial(
  t.Object(
    { user: t.Boolean(), gender: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const ProfileOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      studentNum: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      phone: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      qq: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      school: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      major: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      intention: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      reason: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      bio: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      interest: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      skills: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Profile = t.Composite([ProfilePlain, ProfileRelations], {
  additionalProperties: false,
});

export const ProfileInputCreate = t.Composite(
  [ProfilePlainInputCreate, ProfileRelationsInputCreate],
  { additionalProperties: false },
);

export const ProfileInputUpdate = t.Composite(
  [ProfilePlainInputUpdate, ProfileRelationsInputUpdate],
  { additionalProperties: false },
);
