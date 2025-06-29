interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
}) => (
  <div className="flex flex-col gap-1">
    <h2 className="section-heading">{title}</h2>
    <p className="text-sm text-text-secondary">{description}</p>
    <hr className="border-muted" />
  </div>
);
