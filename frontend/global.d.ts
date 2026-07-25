declare module '*.css' {
  const content: { [key: string]: string };
  export default content;
}

declare module 'react' {
  export = React;
  export as namespace React;
  namespace React {
    type ReactNode = any;
    type ComponentType<P = {}> = any;
    function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prev: T) => T)) => void];
    function useEffect(effect: () => void | (() => void), deps?: any[]): void;
    function useRef<T>(initialValue: T | null): { current: T | null };
    interface ChangeEvent<T = Element> {
      target: T & { value: string };
    }
    interface KeyboardEvent<T = Element> {
      key: string;
    }
    interface FormEvent<T = Element> {
      preventDefault(): void;
    }
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'next/link' {
  const Link: any;
  export default Link;
}

declare module 'next/navigation' {
  export function usePathname(): string;
  export function useRouter(): any;
  export function useSearchParams(): any;
}

declare module 'lucide-react' {
  export const MapPin: any;
  export const Clock: any;
  export const Send: any;
  export const Shield: any;
  export const LayoutDashboard: any;
  export const Map: any;
  export const FileText: any;
  export const Settings: any;
  export const Users: any;
  export const AlertTriangle: any;
  export const Bot: any;
  export const BarChart3: any;
  export const Network: any;
  export const DollarSign: any;
  export const TrendingUp: any;
  export const FileBarChart: any;
  export const ClipboardList: any;
  export const Search: any;
  export const ChevronLeft: any;
  export const ChevronRight: any;
  export const Bell: any;
  export const Activity: any;
  export const Wifi: any;
  export const ShieldAlert: any;
  export const Brain: any;
  export const Flame: any;
  export const CheckCircle2: any;
  export const CheckCircle: any;
  export const ExternalLink: any;
  export const X: any;
  export const HelpCircle: any;
  export const Volume2: any;
  export const Phone: any;
  export const Radio: any;
  export const AlertOctagon: any;
  export const Navigation: any;
  export const UserX: any;
  export const Filter: any;
  export const Eye: any;
  export const Lock: any;
  export const Unlock: any;
  const content: any;
  export default content;
}

declare module 'recharts' {
  export const ResponsiveContainer: any;
  export const LineChart: any;
  export const Line: any;
  export const XAxis: any;
  export const YAxis: any;
  export const Tooltip: any;
  export const CartesianGrid: any;
  export const Legend: any;
  const content: any;
  export default content;
}

declare module 'reactflow' {
  export const Background: any;
  export const Controls: any;
  export type Node = any;
  export type Edge = any;
  const ReactFlow: any;
  export default ReactFlow;
}
