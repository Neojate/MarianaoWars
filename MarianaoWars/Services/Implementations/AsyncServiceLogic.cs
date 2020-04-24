﻿using MarianaoWars.Models;
using MarianaoWars.Repositories.Interfaces;
using MarianaoWars.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Implementations
{
    public class AsyncServiceLogic : IAsyncLogic
    {
        private IRepositoryInstitute repository;

        public AsyncServiceLogic(IRepositoryInstitute repository)
        {
            this.repository = repository;
        }

        public List<Computer> GetComputersBySector(int instituteId, string broadcast)
        {
            int yCoord = int.Parse(broadcast.Split('.')[3]);

            List<Computer> computers = new List<Computer>();
            List<Enrollment> enrollments = repository.GetEnrollments(instituteId).Result;

            foreach (Enrollment enrollment in enrollments)
            {
                foreach (Computer computer in computers)
                {
                    int value = int.Parse(computer.IpDirection.Split('.')[3]);
                    if (value == yCoord)
                        computers.Add(computer);
                }
            }
            return computers;
        }

        public List<SystemResource> GetSystemResources()
        {
            return repository.GetSystemResources().Result;
        }

        public void SaveComputer(Computer computer)
        {
            repository.SaveComputer(computer);
        }

        public void UpdateResource(Resource resource)
        {
            repository.UpdateResource(resource);
        }



    }
}
