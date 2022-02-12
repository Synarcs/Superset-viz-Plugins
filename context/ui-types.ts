type EventData = {
  color: string;
  id: string;
  type: LegendType;
  value: string;
};

type PieStylesProps = {
  height: number;
  width: number;
  legendPosition: LegendPosition;
};

type GroupBy<G extends string> = Record<G, string>;

