﻿using MarianaoWars.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Repositories.Interfaces
{
    public interface IRepositoryInstitute
    {
        // Método que recupera todas las ordenes en funcion de un ordenador.
        Task<List<BuildOrder>> GetBuildOrders(int computerId);

        // Método que recupera todas las hacks en funcion de un ordenador.
        Task<List<HackOrder>> GetHackOrders(int computerId);

        // Método que recupera todos los ordenadores
        Task<List<Computer>> GetComputers(int enrollmentId);

        // Método que recupera un ordenador por su Id
        Task<Computer> GetComputer(int computerId);

        // Método que devuelve un ordenador en función de su ip
        Computer GetComputer(int instituteId, string ip);

        // Método que devuelve una matrícula en función del usuario y el instituto
        Task<Enrollment> GetEnrollment(string userId, int instituteId);

        // Método que devuelve todas las matrículas de un servidor
        Task<List<Enrollment>> GetEnrollments(int instituteId);

        // Método que recupera un instituto en función de su id.
        Task<Institute> GetInstitute(int instituteId);

        // Método que recupera un mensaje en función de su id.
        Task<Message> GetMessage(int messageId);

        // Método que recupera la lista de todos los mensajes de una matrícula
        Task<List<Message>> GetMessages(int computerId, int pageIndex);

        // Método que recupera todos los institutos abiertos
        Task<List<Institute>> GetOpenInstitutes();

        // Método que recupera un Recurso según su id
        Task<Resource> GetResource(int resourceId);

        // Método que recupera los recursos de sistema
        Task<List<SystemResource>> GetSystemResources();

        // Método que recupera los programas del sistema
        Task<List<SystemSoftware>> GetSystemSoftwares();

        // Método que recupera los talentos del sistema
        Task<List<SystemTalent>> GetSystemTalents();

        // Método que recupera los talentos del sistema
        Task<List<SystemScript>> GetSystemScripts();

        // Método que recupera un usuario según su Id
        Task<ApplicationUser> GetUser(string userId);

        // Método que guarda un script
        Task<Script> SaveScript(Script script);

        // Método que guarda una Orden de construcción
        Task<BuildOrder> SaveBuildOrder(BuildOrder buildOrder);

        // Método que guarda un ordenador
        Task<Computer> SaveComputer(Computer computer);

        // Método que guarda una matrícula
        Task<Enrollment> SaveEnrollment(Enrollment enrollment);

        // Método que guarda un recurso
        Task<Resource> SaveResource(Resource resource);

        // Método que guarda un software
        Task<Software> SaveSoftware(Software software);

        // Método que guarda un talento
        Task<Talent> SaveTalent(Talent talent);

        // Método que actualiza el mensaje
        Task<Message> UpdateMessage(Message message);

        // Método que actualiza los recursos
        Task<Resource> UpdateResource(Resource resource);

        // Método que actualiza los recursos
        Task<Computer> UpdateComputer(Computer computer);

        // Método que actualiza el usuario
        Task<ApplicationUser> UpdateApplicationUser(ApplicationUser user);

        // Método que actualiza los recursos de forma síncrona
        Resource NotAsyncUpdateResource(Resource resource);

        // Método que borra un mensaje en función de su id
        void DeleteMessage(int messageId);

        // Método que borra todos los mensaje de un usuario en un servidor
        void DeleteAllMessage(int computerId);

        //Método para ver si tenemos mensajes sin leer
        Task<List<Message>> IsNotReadMessages(int computerId);

        // Método que guarda un mensaje
        Task<Message> SaveMessage(Message message);

        // Método que devuelve la lista de las órdenes de Hack en función del From
        Task<List<HackOrder>> GetHackOrdersFrom(int fromId);

        // Método que devuelve la lista de las órdenes de Hack en función del To
        Task<List<HackOrder>> GetHackOrdersTo(int toId);

        // Método que crea una Hack
        Task<HackOrder> SaveHackOrder(HackOrder hackOrder);

    }
}
