export interface Message {
  role: string;
  name?: string;
  tool_name?: string;
  content: string;
}
