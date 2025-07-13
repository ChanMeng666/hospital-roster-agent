export const calendarTemplates = {
  popupIsAllday: () => "All Day Shift",
  popupStateFree: () => "Available",
  popupStateBusy: () => "On Duty",
  titlePlaceholder: () => "Shift Title",
  locationPlaceholder: () => "Department/Ward",
  startDatePlaceholder: () => "Shift Start",
  endDatePlaceholder: () => "Shift End",
  popupSave: () => "Save Shift",
  popupUpdate: () => "Update Shift",
  popupDetailTitle: ({ title }: any) => title,
  popupDetailDate: ({ isAllday, start, end }: any) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    if (isAllday) {
      return startDate.toLocaleDateString();
    }
    
    const isSameDay = startDate.toDateString() === endDate.toDateString();
    
    if (isSameDay) {
      return `${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return `${startDate.toLocaleString()} - ${endDate.toLocaleString()}`;
  },
  popupDetailLocation: ({ location }: any) => location || "No location specified",
  popupEdit: () => "Edit",
  popupDelete: () => "Delete",
};