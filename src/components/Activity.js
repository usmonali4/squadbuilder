import React, { useRef } from 'react';

const Activity = ({ username }) => {
  const activityNameRef = useRef();
  const activityDescriptionRef = useRef();
  const startDateRef = useRef();
  const startTimeRef = useRef();
  const endDateRef = useRef();
  const endTimeRef = useRef();

  const handleSubmitActivity = async (e) => {
    e.preventDefault();
    const activityName = activityNameRef.current.value;
    const activityDescription = activityDescriptionRef.current.value;
    const startDate = startDateRef.current.value;
    const startTime = startTimeRef.current.value;
    const endDate = endDateRef.current.value;
    const endTime = endTimeRef.current.value;

    if (
      activityName.trim() === '' ||
      activityDescription.trim() === '' ||
      startDate === '' ||
      startTime === '' ||
      endDate === '' ||
      endTime === ''
    ) {
      alert("Please fill in all fields and select both start and finish times");
      return;
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    // Validation check: Ensure finish time is after start time
    if (endDateTime <= startDateTime) {
      alert("Finish time cannot be before start time");
      return;
    }

    try {
      const activityData = {
        name: activityName,
        description: activityDescription,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        username,
      };

      const response = await fetch('/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activityData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create activity: ${response.statusText}`);
      }

      // Handle successful activity creation (e.g., clear form or redirect)
      activityNameRef.current.value = '';
      activityDescriptionRef.current.value = '';
      startDateRef.current.value = '';
      startTimeRef.current.value = '';
      endDateRef.current.value = '';
      endTimeRef.current.value = '';
      alert("Activity created successfully!");
    } catch (error) {
      alert("Failed to create activity");
      console.error(error);
    }
  };

  return (
    <div className="activity-form">
      <h2>Create Activity</h2>
      <form onSubmit={handleSubmitActivity}>
        <div>
          <label htmlFor="activity-name">Activity Name:</label>
          <input
            type="text"
            id="activity-name"
            ref={activityNameRef}
            required
          />
        </div>
        <div>
          <label htmlFor="activity-description">Description:</label>
          <textarea
            id="activity-description"
            ref={activityDescriptionRef}
            required
          />
        </div>
        <div>
          <h2>Schedule</h2>
          <div className="date-time-pickers">
            <div>
              <label htmlFor="start-date">Start Date:</label>
              <input
                type="date"
                id="start-date"
                ref={startDateRef}
                required
              />
            </div>
            <div>
              <label htmlFor="start-time">Start Time:</label>
              <input
                type="time"
                id="start-time"
                ref={startTimeRef}
                required
              />
            </div>
            <div>
              <label htmlFor="end-date">End Date:</label>
              <input
                type="date"
                id="end-date"
                ref={endDateRef}
                required
              />
            </div>
            <div>
              <label htmlFor="end-time">End Time:</label>
              <input
                type="time"
                id="end-time"
                ref={endTimeRef}
                required
              />
            </div>
          </div>
        </div>
        <button type="submit">Create Activity</button>
      </form>
    </div>
  );
};

export default Activity;
