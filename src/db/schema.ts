import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
  customType,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return "bytea";
  },
});

/* ── Manuscript submissions (Submit Paper / Track Paper) ─────────────────── */
export const submissions = pgTable(
  "submissions",
  {
    id: serial("id").primaryKey(),
    paperId: varchar("paper_id", { length: 32 }).notNull(),
    title: text("title").notNull(),
    abstract: text("abstract").notNull(),
    keywords: varchar("keywords", { length: 500 }).notNull(),
    subjectArea: varchar("subject_area", { length: 120 }).notNull(),
    doiRequested: boolean("doi_requested").notNull().default(false),
    hardCopyRequested: boolean("hard_copy_requested").notNull().default(false),

    // Main author
    authorName: varchar("author_name", { length: 160 }).notNull(),
    authorEmail: varchar("author_email", { length: 200 }).notNull(),
    authorPhone: varchar("author_phone", { length: 40 }).notNull(),
    authorAffiliation: varchar("author_affiliation", { length: 240 }).notNull(),
    coAuthors: jsonb("co_authors").$type<{ name: string; affiliation: string }[]>().notNull().default([]),

    // Address
    address: text("address").notNull(),
    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }).notNull(),
    country: varchar("country", { length: 100 }).notNull(),
    postalCode: varchar("postal_code", { length: 20 }).notNull(),

    // Manuscript file (.doc/.docx stored server-side)
    fileName: varchar("file_name", { length: 255 }),
    fileSize: integer("file_size"),
    fileData: bytea("file_data"),

    status: varchar("status", { length: 32 }).notNull().default("submitted"),
    statusNote: text("status_note"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("submissions_paper_id_idx").on(t.paperId),
    index("submissions_email_idx").on(t.authorEmail),
    index("submissions_created_idx").on(t.createdAt),
  ]
);

export type Submission = typeof submissions.$inferSelect;

/* ── Published papers (Current Issue / Archive library) ──────────────────── */
export const publishedPapers = pgTable(
  "published_papers",
  {
    id: serial("id").primaryKey(),
    publishedId: varchar("published_id", { length: 32 }).notNull(),
    title: text("title").notNull(),
    authors: varchar("authors", { length: 600 }).notNull(),
    abstract: text("abstract").notNull(),
    keywords: varchar("keywords", { length: 500 }).notNull(),
    area: varchar("area", { length: 120 }).notNull(),
    volume: integer("volume").notNull(),
    issue: integer("issue").notNull(),
    issuePeriod: varchar("issue_period", { length: 40 }).notNull(),
    pages: varchar("pages", { length: 24 }).notNull(),
    doi: varchar("doi", { length: 80 }),
    citations: integer("citations").notNull().default(0),
    downloads: integer("downloads").notNull().default(0),
    publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("published_papers_pid_idx").on(t.publishedId),
    index("published_papers_issue_idx").on(t.volume, t.issue),
    index("published_papers_area_idx").on(t.area),
  ]
);

export type PublishedPaper = typeof publishedPapers.$inferSelect;

/* ── Contact messages ─────────────────────────────────────────────────────── */
export const contacts = pgTable(
  "contacts",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 160 }).notNull(),
    email: varchar("email", { length: 200 }).notNull(),
    mobile: varchar("mobile", { length: 40 }),
    subject: varchar("subject", { length: 240 }).notNull(),
    message: text("message").notNull(),
    handled: boolean("handled").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("contacts_created_idx").on(t.createdAt)]
);

export type Contact = typeof contacts.$inferSelect;
