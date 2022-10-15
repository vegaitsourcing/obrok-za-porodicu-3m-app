﻿using AutoMapper;
using MealForFamily.DTOs;
using MealForFamily.Models;

namespace MealForFamily.Profiles
{
    public class VolunteerActionTypeProfile : Profile
    {
        public VolunteerActionTypeProfile()
        {
            CreateMap<VolunteerActionType, VolunteerActionTypeDTO>();
        }
    }
}
