class RequestedAppointmentsManager {
    static appointments = [];

    static addAppointment(appointment) {
        const newAppointment = {
            id: this.appointments.length + 1,
            purpose: appointment.purpose,
            date: appointment.date,
            time: appointment.time,
            message: appointment.message,
            isConfirmed: false,
        };
        this.appointments.push(newAppointment);
        return newAppointment;
    }

    static confirmAppointment(id) {
        const appointment = this.appointments.find(a => a.id === id);
        if (appointment) {
            appointment.isConfirmed = true;
        }
    }

    static removeAppointment(id) {
        this.appointments = this.appointments.filter(a => a.id !== id);
    }

    static getAll() {
        return this.appointments;
    }

}
export default RequestedAppointmentsManager;