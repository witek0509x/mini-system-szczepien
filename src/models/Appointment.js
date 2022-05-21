class Appointment
{
    _whichDose;
    _timeSlot;
    _patient;
    _vaccine;
    _completed;
    _vaccineBatchNumber;

    constructor(appointment)
    {
        this._whichDose = appointment.whichDose;
        this._timeSlot = appointment.timeSlot;
        this._patient = appointment.patient;
        this._vaccine = appointment.vaccine;
        this._completed = appointment.completed;
        this._vaccineBatchNumber = appointment.vaccineBatchNumber;
    }

    get getWhichDose() { return this._whichDose; }
    set setWhichDose(whichDose) { this._whichDose = whichDose; }

    get getTimeSlot() { return this._timeSlot; }
    set setTimeSlot(timeSlot) { this._timeSlot = timeSlot; }
    
    get getPatient() { return this._patient; }
    set setPatient(patient) { this._patient = patient; }

    get getVaccine() { return this._vaccine; }
    set setVaccine(vaccine) { this._vaccine = vaccine; }

    get getCompleted() { return this._completed; }
    set setCompleted(completed) { this._completed = completed; }

    get getVaccineBatchNumber() { return this._vaccineBatchNumber; }
    set setVaccineBatchNumber(vaccineBatchNumber) { this._vaccineBatchNumber = vaccineBatchNumber; }
}

function createAppointment(whichDose,timeSlot,patient,vaccine,completed,vaccineBatchNumber)
{
    appointment = new Object();
    appointment.whichDose = whichDose;
    appointment.timeSlot = timeSlot;
    appointment.patient = patient;
    appointment.vaccine = vaccine;
    appointment.completed = completed;
    appointment.vaccineBatchNumber = vaccineBatchNumber;
    return new Appointment(appointment);
}