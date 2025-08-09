"use client";
import { useEffect, useState } from "react";
import { loadHistory, deleteCase, type CaseEntry } from "../../lib/storage";
import { exportCasePDF } from "../../lib/pdf";
import { isPro } from "../../lib/pro";
