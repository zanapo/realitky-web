type PageHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export const PageHeader = ({ title, description, children }: PageHeaderProps) => (
  <div className="space-y-4">
    <h1 className="text-3xl font-semibold">{title}</h1>
    {description && <p className="text-muted-foreground">{description}</p>}
    {children}
  </div>
);
