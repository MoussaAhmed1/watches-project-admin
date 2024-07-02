interface HeadingProps {
  title: string;
  description?: string;
  customStyle?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  customStyle,
}) => {
  return (
    <div className={`${customStyle}`}>
      <h2 className={`text-3xl font-bold tracking-tight`}>
        {title}
      </h2>
      {description && (
        <p className="text-sm mx-2 text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
