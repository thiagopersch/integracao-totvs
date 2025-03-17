export type Client = {
  id?: string;
  name: string;
  link_crm: string;
  site: string;
  status: boolean;
  created_at?: string;
  updated_at?: string;
};

export type FormattedClient = Client & {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
  formattedStatus?: string;
};
