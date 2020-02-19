using MarianaoWars.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Repositories.Interfaces
{
    public interface IInstitutoRepository
    {
        IEnumerable<Instituto> GetInstitutos();

        Instituto GetInstituto(Guid id);

        Instituto CreateInstituto(Instituto createdInstituto);

        void UpdateInstituto(Instituto updatedInstituto);

        void DeleteInstituto(Guid id);

    }
}
