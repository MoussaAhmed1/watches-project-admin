interface HeadingProps {
  title: string;
  description?: string;
  extra_description?: string;
  customStyle?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  customStyle,
  extra_description
}) => {
  return (
    <div className={`${customStyle}`}>
      <h2 className={`text-3xl font-bold tracking-tight`}>
        {title}
      </h2>
      {description && (
        <p className="text-sm mx-0 text-muted-foreground mt-1">{description}</p>
      )}
      {extra_description && (
        <p className="text-sm mx-0 text-muted-foreground mt-1">{extra_description}</p>
      )}
    </div>
  );
};
