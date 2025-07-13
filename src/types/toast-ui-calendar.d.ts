declare module '@toast-ui/calendar' {
  export interface EventObject {
    id?: string;
    calendarId?: string;
    title?: string;
    body?: string;
    start?: Date | string;
    end?: Date | string;
    goingDuration?: number;
    comingDuration?: number;
    isAllday?: boolean;
    category?: string;
    dueDateClass?: string;
    location?: string;
    attendees?: string[];
    recurrenceRule?: string;
    state?: string;
    isVisible?: boolean;
    isPending?: boolean;
    isFocused?: boolean;
    isReadOnly?: boolean;
    isPrivate?: boolean;
    color?: string;
    backgroundColor?: string;
    dragBackgroundColor?: string;
    borderColor?: string;
    customStyle?: string;
    raw?: any;
  }

  export interface Options {
    defaultView?: string;
    theme?: any;
    template?: any;
    week?: any;
    month?: any;
    calendars?: any[];
    useCreationPopup?: boolean;
    useDetailPopup?: boolean;
    isReadOnly?: boolean;
    usageStatistics?: boolean;
    eventFilter?: (event: EventObject) => boolean;
    timezone?: any;
    disableDblClick?: boolean;
    disableClick?: boolean;
    gridSelection?: boolean;
  }

  export interface UpdateEventData {
    event: EventObject;
    changes: Partial<EventObject>;
  }

  export interface ExternalEventTypes {
    beforeCreateEvent?: (event: any) => void;
    beforeUpdateEvent?: (updateData: UpdateEventData) => void;
    beforeDeleteEvent?: (event: any) => void;
    afterRenderEvent?: (event: any) => void;
    clickEvent?: (event: any) => void;
    clickDayName?: (event: any) => void;
    clickTimezonesCollapseBtn?: (event: any) => void;
    selectDateTime?: (event: any) => void;
  }
}