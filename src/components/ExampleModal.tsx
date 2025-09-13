import React from 'react';
import { RealWorldExample } from '../types/attack';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Link, Chip, Box } from '@mui/material';
import { realWorldExamples } from '../data/realWorldExamples';

interface ExampleModalProps {
  open: boolean;
  onClose: () => void;
  techniqueId?: string;
}

const ExampleModal: React.FC<ExampleModalProps> = ({ open, onClose, techniqueId }) => {
  // Filter examples that include the selected technique
  const relevantExamples = techniqueId 
    ? realWorldExamples.filter(example => example.techniqueIds.includes(techniqueId))
    : [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Real-World Attack Examples
        {techniqueId && (
          <Typography variant="subtitle1" color="text.secondary">
            For Technique: {techniqueId}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent dividers>
        {relevantExamples.length > 0 ? (
          relevantExamples.map(example => (
            <Box key={example.id} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                {example.name} ({example.year})
              </Typography>
              <Typography variant="body1" paragraph>
                {example.description}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" component="span" sx={{ mr: 1 }}>
                  Related Techniques:
                </Typography>
                {example.techniqueIds.map(id => (
                  <Chip 
                    key={id} 
                    label={id} 
                    size="small" 
                    color={id === techniqueId ? "primary" : "default"}
                    sx={{ mr: 0.5, mb: 0.5 }} 
                  />
                ))}
              </Box>
              <Typography variant="body2">
                <Link href={example.reference} target="_blank" rel="noopener noreferrer">
                  Read more about this attack
                </Link>
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body1" align="center" sx={{ py: 4 }}>
            {techniqueId 
              ? "No real-world examples found for this technique."
              : "Select a technique to see related real-world examples."}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExampleModal;
