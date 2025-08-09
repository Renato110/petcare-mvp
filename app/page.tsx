"use client";
import { useState } from "react";
import PetForm from "../components/PetForm";
import SymptomChecker from "../components/SymptomChecker";
import type { Pet, SymptomsInput, TriageResult, CaseEntry } from "../lib/storage";
import { saveCase } from "../lib/storage";
import { isPro } from "../lib/pro";
import { exportCasePDF } from "../lib/pdf";
import { whatsappUrlFromCase, calendlyUrl } from "../lib/tele";

